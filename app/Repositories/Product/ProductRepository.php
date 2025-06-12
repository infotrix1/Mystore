<?php

namespace App\Repositories\Product;

use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
    protected $model;

    public function __construct(Product $plan)
    {
        $this->model = $plan;
    }

    public function all()
    {
        return $this->model->all();
        // return Product::with('category')->paginate(10);
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        $product  = $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $product  = $this->find($id);
        $product ->update($data);
        return $product;
    }

    public function delete($id)
    {
        $product  = $this->find($id);
        $product->delete();
    }
}
