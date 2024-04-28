from typing import Optional

class Definition:
    def __init__(self,definition,example):
        self.definition=definition
        self.example=example
        
    definition:str
    example:Optional[str]
    
class Meaning:
    def __init__(self,part_of_speech,definitions,synonyms,antonyms):
        self.partOfSpeech=part_of_speech
        self.definitions=definitions
        self.synonyms=synonyms
        self.antonyms=antonyms
    
    part_of_speech:str
    definitions: list[Definition]   
    synonyms: list[str]
    antonyms:list[str]

class Dictionary:
    def __init__(self,word,meanings):
        self.word=word
        self.meanings=meanings
    
    word:str
    meanings:list[Meaning]
    
    