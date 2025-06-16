<?php

namespace App\Repositories\Order;


interface OrderRepositoryInterface
{
    public function all();
    public function getOrders();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
