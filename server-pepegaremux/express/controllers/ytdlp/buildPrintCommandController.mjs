const buildPrintCommand = (url, instructions, parameters) => {
    
    let structure = {
        application: 'yt-dlp',
        instructions: instructions,
        parameters: parameters
        
    }
    structure.parameters.forEach((parameter, index) => {
        structure.parameters[index] = `%(${parameter})s`;
    })
    
    let instructionsString = '';
    let parametersString = '';

    structure.instructions.forEach((instruction) => {
        instructionsString+= `${instruction}\t`
    })

    structure.parameters.forEach((parameter, index) => {
        
        if (index+1 == structure.parameters.length) {
            parametersString += `${parameter}`;
            return
        }
        parametersString += `${parameter}\t`;
    })

    const printCommand = `${structure.application}\t${instructionsString}"${parametersString}"\t"${url}"`;
    console.log(`Generated print command: ` + printCommand)
    return printCommand
}

export default buildPrintCommand;