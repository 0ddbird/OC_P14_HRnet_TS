<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Department;

#[Route('/api', name: 'api_')]
class DepartmentController extends AbstractController
{
    #[Route('/department', name: 'get_department', methods: 'GET')]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $departments = $doctrine
        ->getRepository(Department::class)
        ->findAll();
        $data = [];

        foreach($departments as $department) {
            $data[] = [
                'id' => $department->getId(),
                'name' => $department->getName(),
                'code' => $department->getCode()
            ];
        }
        return $this->json($data);
    }

    #[Route('/department', name:'create_department', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $reqBody = json_decode($request->getContent(), true);
        $em = $doctrine -> getManager();
        $department = new Department();
        $department->setName($reqBody['name']);
        $department->setCode($reqBody['code']);
        $em->persist($department);
        $em->flush();

        return $this->json('Successfully created new department with id: ' . $department->getId());
    }
}
