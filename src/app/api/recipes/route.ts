import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { recipeId, size, ingredientId, newQuantity } = await request.json();

    if (typeof recipeId !== 'number' || typeof ingredientId !== 'number' || typeof newQuantity !== 'number' || (size !== 'sizeM' && size !== 'sizeS')) {
      return NextResponse.json({ error: 'Invalid input data. Must provide recipeId, size ("sizeM" or "sizeS"), ingredientId and newQuantity.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'data.ts');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'data.ts file not found' }, { status: 404 });
    }

    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extract the specific recipe block
    const recipeRegex = new RegExp(`"recipe_id":\\s*${recipeId}[\\s\\S]*?(?="recipe_id"|$)`);
    const recipeMatch = fileContent.match(recipeRegex);
    
    if (!recipeMatch) {
      return NextResponse.json({ error: `Could not find recipe with id ${recipeId}` }, { status: 404 });
    }
    const recipeStr = recipeMatch[0];

    // Extract the specific size block within the recipe
    const sizeRegex = new RegExp(`"${size}":\\s*{[\\s\\S]*?(?="size[MS]":|$)`);
    const sizeMatch = recipeStr.match(sizeRegex);

    if (!sizeMatch) {
      return NextResponse.json({ error: `Could not find size ${size} inside recipe ${recipeId}` }, { status: 404 });
    }
    const sizeStr = sizeMatch[0];

    // Find and replace the ingredient quantity within the size block
    const ingredientRegex = new RegExp(`("ingredient_id":\\s*${ingredientId}[\\s\\S]*?"quantity":\\s*)\\d+(\\.?\\d*)`, '');
    
    if (!ingredientRegex.test(sizeStr)) {
      return NextResponse.json({ error: `Could not find ingredient ${ingredientId} in ${size} of recipe ${recipeId}` }, { status: 404 });
    }

    const newSizeStr = sizeStr.replace(ingredientRegex, `$1${newQuantity}`);
    const newRecipeStr = recipeStr.replace(sizeStr, newSizeStr);
    fileContent = fileContent.replace(recipeStr, newRecipeStr);

    // Save the file
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, message: `Updated recipe ${recipeId} (${size}) ingredient ${ingredientId} quantity to ${newQuantity}` });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
