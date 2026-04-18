import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { id, newPrice } = await request.json();

    if (typeof id !== 'number' || typeof newPrice !== 'number') {
      return NextResponse.json({ error: 'Invalid input data. Must provide id and newPrice as numbers.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'data.ts');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'data.ts file not found' }, { status: 404 });
    }

    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // Regular Expression để tìm block của ingredient có id tương ứng
    // Dạng: "id": 1, ... [bất kỳ ký tự nào không tham lam] ... "unit_price": 180000,
    const regex = new RegExp(`("id":\\s*${id},[\\s\\S]*?"unit_price":\\s*)\\d+(,?\\s*)`, 'g');
    
    if (!regex.test(fileContent)) {
      return NextResponse.json({ error: `Could not find ingredient with id ${id} or unit_price property` }, { status: 404 });
    }

    // Thay thế unit_price cũ bằng giá trị mới
    regex.lastIndex = 0; // reset index sau khi test
    fileContent = fileContent.replace(regex, `$1${newPrice}$2`);

    // Lưu lại file
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, message: `Updated ingredient ${id} price to ${newPrice}` });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
