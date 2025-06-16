<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Services\ProductService;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;

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

    public function admin()
    {
        $user = Auth::user();

        // Optionally check if user is admin, redirect if not
        if (!$user || $user->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        // Get all products and orders, eager load relationships if needed
        $products = Product::all(); // or with relations: Product::with('category')->get();
        $orders = Order::with('items.product')->get(); // assuming orders have items relationship

        // dd($orders);
        // Pass data to Inertia
        return Inertia::render('admin/AdminDashboard', [
            'user' => $user,
            'products' => $products,
            'orders' => $orders,
        ]);
    }
}
