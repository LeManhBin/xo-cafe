import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { recipeId, ingredientId, newQuantity } = await request.json();

    if (typeof recipeId !== 'number' || typeof ingredientId !== 'number' || typeof newQuantity !== 'number') {
      return NextResponse.json({ error: 'Invalid input data. Must provide recipeId, ingredientId and newQuantity as numbers.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'data.ts');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'data.ts file not found' }, { status: 404 });
    }

    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split at the specific recipe ID to limit the regex scope to just this recipe
    const parts = fileContent.split(`"recipe_id": ${recipeId}`);
    
    if (parts.length < 2) {
      return NextResponse.json({ error: `Could not find recipe with id ${recipeId}` }, { status: 404 });
    }

    // parts[1] contains the rest of the file starting right after `"recipe_id": 101`
    // We search for the first occurrence of ingredient_id and its quantity
    const regex = new RegExp(`("ingredient_id":\\s*${ingredientId}[\\s\\S]*?"quantity":\\s*)\\d+(\\.?\\d*)`, '');
    
    if (!regex.test(parts[1])) {
      return NextResponse.json({ error: `Could not find ingredient ${ingredientId} inside recipe ${recipeId}` }, { status: 404 });
    }

    // Replace the quantity
    parts[1] = parts[1].replace(regex, `$1${newQuantity}`);

    // Re-join the content
    fileContent = parts.join(`"recipe_id": ${recipeId}`);

    // Save the file
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, message: `Updated recipe ${recipeId} ingredient ${ingredientId} quantity to ${newQuantity}` });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
