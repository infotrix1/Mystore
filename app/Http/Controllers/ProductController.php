<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Services\ProductService;

class ProductController extends Controller
{
    protected $service;

    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $products = $this->service->getAllProducts();
        return Inertia::render('Products', compact('products'));
    }

    public function show($id)
    {
        $product = $this->service->getProductById($id);
        return Inertia::render('ProductDetail', compact('product'));
    }

    public function cart()
    {
        return Inertia::render('Cart');
    }

    public function store(ProductRequest $request)
    {
        $this->service->createProduct($request->validated());
        return redirect()->route('products.index');
    }

    public function update(ProductRequest $request, $id)
    {
        $this->service->updateProduct($id, $request->validated());
        return redirect()->route('products.index');
    }

    public function destroy($id)
    {
        $this->service->deleteProduct($id);
        return redirect()->route('products.index');
    }
}
