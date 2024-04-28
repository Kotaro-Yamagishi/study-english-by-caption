import requests
import json
import api.schemas.vocabulary as vocabulary_schema

def get_information(word:str):
    r = requests.get('https://api.dictionaryapi.dev/api/v2/entries/en/{}'.format(word))
    # Export the data for use in future steps
    json_r=json.dumps(r.json())
    list_w=json.loads(json_r)
    
    print(list_w)
    
    meanings:list[vocabulary_schema.Meaning]=[]
    dictionary=vocabulary_schema.Dictionary(
            word=word,
            meanings=meanings
        )
    
    for w in list_w:
        for m in w["meanings"]:
            definitions:list[vocabulary_schema.Definition]=[]
            meaning=vocabulary_schema.Meaning(
                part_of_speech=m["partOfSpeech"],
                definitions=definitions,
                synonyms=m["synonyms"],
                antonyms=m["antonyms"]
            )
            dictionary.meanings.append(meaning)
            for d in m["definitions"]:
                definition=vocabulary_schema.Definition(
                    definition=d.get("definition"),
                    example=d.get("example")
                )
                meaning.definitions.append(definition)
    return dictionary