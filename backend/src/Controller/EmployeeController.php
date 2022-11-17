<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Employee;
use App\Entity\State;
use App\Entity\Department;
use DateTime;

#[Route('/api', name: 'api_')]
class EmployeeController extends AbstractController
{
    #[Route('/employee', name: 'get_employees', methods: 'GET')]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $employees = $doctrine
        ->getRepository(Employee::class)
        ->findAll();
        $data = [];

        foreach($employees as $employee) {
            $data[] = [
                'id' => $employee->getId(),
                'firstname' => $employee->getFirstname(),
                'lastname' => $employee->getLastname(),
                'birthdate' => $employee->getBirthdate()->format('Y-m-d'),
                'startdate' => $employee->getstartdate()->format('Y-m-d'),
                'street' => $employee->getStreet(),
                'city' => $employee->getCity(),
                'state_id' => $employee->getState()->getId(),
                'state_name' => $employee->getState()->getName(),
                'state_code' => $employee->getState()->getCode(),
                'zipcode' => $employee->getZipcode(),
                'department_id' => $employee->getDepartment()->getId(),
                'department_name' => $employee->getDepartment()->getName(),
                'department_code' => $employee->getDepartment()->getCode(),
            ];
        }
        return $this->json($data);
    }
    
    #[Route('/employee', name:'create_employee', methods: 'POST')]
    public function new(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $reqBody = json_decode($request->getContent(), true);
        $entityManager = $doctrine -> getManager();
        $employee = new Employee();
        $employee->setFirstname($reqBody['firstname']);
        $employee->setLastname($reqBody['lastname']);
        $employee->setBirthdate(new DateTime($reqBody['birthdate']));
        $employee->setStartdate(new DateTime($reqBody['startdate']));
        $employee->setStreet($reqBody['street']);
        $employee->setCity($reqBody['city']);
        $employee->setZipcode($reqBody['zipcode']);

        $stateId = $reqBody['state'];
        $state = $doctrine
        ->getRepository(State::class)
        ->find($stateId);
        $employee->setState($state);

        $departmentId = $reqBody['department'];
        $department = $doctrine
        ->getRepository(Department::class)
        ->find($departmentId);
        $employee->setDepartment($department);

        $entityManager->persist($employee);
        $entityManager->flush();

        return $this->json('Successfully created new employee with id: ' . $employee->getId());
    }
}
