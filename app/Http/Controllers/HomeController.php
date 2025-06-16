<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Product;



class HomeController extends Controller
{

    public function index()
    {
        $product = Product::with('category')->limit(3)->get();
        return Inertia::render('Home', [
            'product' => $product,
        ]);
    }

}
