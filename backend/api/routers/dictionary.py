from fastapi import APIRouter,Depends, HTTPException
import api.services.dictionary as dictionary_service

router=APIRouter()

@router.get("/dictionary/{word}")
def get_dictionary(word:str):
    return dictionary_service.get_information(word)