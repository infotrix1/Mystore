<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Define categories and products with matching names and images
        $products = [
            [
                'name' => 'Smartphone',
                'image' => 'https://images.pexels.com/photos/7156883/pexels-photo-7156883.jpeg',
                'category' => 'Electronics',
            ],
            [
                'name' => 'Laptop',
                'image' => 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
                'category' => 'Electronics',
            ],
            [
                'name' => 'Novel Book',
                'image' => 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
                'category' => 'Books',
            ],
            [
                'name' => 'Cookbook',
                'image' => 'https://images.pexels.com/photos/159621/books-bookstore-book-reading-159621.jpeg',
                'category' => 'Books',
            ],
            [
                'name' => 'T-Shirt',
                'image' => 'https://images.pexels.com/photos/1002645/pexels-photo-1002645.jpeg',
                'category' => 'Clothing',
            ],
            [
                'name' => 'Jacket',
                'image' => 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
                'category' => 'Clothing',
            ],
            [
                'name' => 'Blender',
                'image' => 'https://images.pexels.com/photos/3654595/pexels-photo-3654595.jpeg',
                'category' => 'Home & Kitchen',
            ],
            [
                'name' => 'Coffee Maker',
                'image' => 'https://images.pexels.com/photos/373948/pexels-photo-373948.jpeg',
                'category' => 'Home & Kitchen',
            ],
            [
                'name' => 'Toy Car',
                'image' => 'https://images.pexels.com/photos/163743/pexels-photo-163743.jpeg',
                'category' => 'Toys',
            ],
            [
                'name' => 'Teddy Bear',
                'image' => 'https://images.pexels.com/photos/459196/pexels-photo-459196.jpeg',
                'category' => 'Toys',
            ],
        ];

        // Create categories and map names to IDs
        $categoryMap = [];
        foreach (array_unique(array_column($products, 'category')) as $categoryName) {
            $category = Category::firstOrCreate(['name' => $categoryName]);
            $categoryMap[$categoryName] = $category->id;
        }

        // Create products
        foreach ($products as $item) {
            Product::create([
                'name' => $item['name'],
                'description' => "High-quality {$item['name']} for your needs.",
                'price' => rand(100, 1000),
                'category_id' => $categoryMap[$item['category']],
                'image' => $item['image'],
                'stock' => rand(10, 100),
                'rating' => round(rand(10, 50) / 10, 1),
            ]);
        }
    }
}
