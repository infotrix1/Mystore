<?php

namespace App\Services;

use App\Repositories\Product\ProductRepository;


class ProductService
{
    protected $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAllProducts()
    {
        return $this->repository->all();
    }

    public function getProductById($id)
    {
        return $this->repository->find($id);
    }

    public function createProduct(array $data)
    {
        return $this->repository->create($data);
    }

    public function updateProduct($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function deleteProduct($id)
    {
        $this->repository->delete($id);
    }
}
