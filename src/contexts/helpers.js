
export const removeFromTagList = (tagNameToRemove) => {
    setTagList(prev => prev.filter((tag) => tag.name !== tagNameToRemove)) 
}

export const addToTagList = (newTag) => {
    setTagList(prev => [
        ...prev.filter((tag) => tag.name !== newTag.name),
        newTag,
    ]) 
}