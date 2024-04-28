export type Caption={
    text:string
    start:string
}

type Definition={
    definition:string
    synonyms:string[]
    antonyms:string[]
    example:string[]
}

type Meaning={
    partOfSpeech:string
    definitions:Definition[]
    synonyms:string[]
    antonyms:string[]
}

export type Dictionary={
    word:string
    meanings:Meaning[]
}

export type channelInfo={
    videoId:string
    title:string
    channelTitle:string
    thumbnailLink:string
}