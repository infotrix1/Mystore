<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Services\OrderService;
use App\Http\Requests\OrderRequest;



class OrderController extends Controller
{
    protected $service;

    public function __construct(OrderService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $order = $this->service->getAll();
        return redirect()->route('orders.show', $order->id);
    }

    public function store(OrderRequest $request)
    {
        $order = $this->service->createOrder($request->validated());
        return redirect()->route('orders.show', $order->id);
    }

    public function show($id)
    {
        $order = $this->service->getOrderById($id);
        return Inertia::render('Orders/Show', compact('order'));
    }

    public function OrderGetById()
    {
        $orders = $this->service->OrderGetById();
        // dd($order);
        return Inertia::render('Orders', ['orders' => $orders]);
    }

    public function update(OrderRequest $request, $id)
    {
        $this->service->updateOrder($id, $request->validated());
        return redirect()->route('orders.show', $id);
    }

    public function destroy($id)
    {
        $this->service->deleteOrder($id);
        return redirect()->route('orders.index');
    }
}
