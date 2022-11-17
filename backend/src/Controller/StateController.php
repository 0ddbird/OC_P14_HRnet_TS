<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\State;

#[Route('/api', name: 'api_')]
class StateController extends AbstractController
{
    #[Route('/state', name: 'get_states', methods: 'GET')]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $states = $doctrine
        ->getRepository(State::class)
        ->findAll();
        $data = [];

        foreach($states as $state) {
            $data[] = [
                'id' => $state->getId(),
                'name' => $state->getName(),
                'code' => $state->getCode()
            ];
        }
        return $this->json($data);
    }

    #[Route('/state', name:'create_state', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $reqBody = json_decode($request->getContent(), true);
        /* var_dump($reqBody); */
        $em = $doctrine -> getManager();
        $state = new State();
        $state->setName($reqBody['name']);
        $state->setCode($reqBody['code']);
        $em->persist($state);
        $em->flush();

        return $this->json('Successfully created new state with id: ' . $state->getId());
    }
}
