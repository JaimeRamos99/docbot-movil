/**
 * Inicio de sesión del usuario-pacient
 * @param {*} documentNumber 
 * @param {*} password 
 */
export function signIn(documentNumber,password){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/patients/login`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ documentNumber, password })
    });
}

export function UpdatePatient(id, name, lastName, age, height, avatar){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/patients/updatepat`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, name, lastName, age, height, avatar })
    });
}

export function UpdatePatientWeight(id, weight){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/patients/updateweight`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, weight })
    });
}

/**
 * 
 * @param {*} pat 
 */
export function GetGoals(pat){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/goals/buscar`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ pat })
    });
}

export function UpdateGoal(id, progress, state, nMessages, complianceDate){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/goals`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, progress, state, nMessages, complianceDate })
    });
}

/**
 * 
 * @param {*} patient 
 * @param {*} type 
 */
export function GetParaclinicals(patient, type){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/paraclinicals/buscar`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ patient,  type})
    });
}

/**
 * 
 * @param {*} patient 
 * @param {*} type 
 * @param {*} value 
 */
export function CreateParaclinical(patient, type, value){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/paraclinicals`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ patient, type, value })
    });
}

export function GetDoctorMessage(p, typeDescription){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/messages`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ patient,  type})
    });
}

/**
 * Obtener mensajes enviados por el doctor
 * @param {*} patient 
 */
export function getMessagesD(patient){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/messagesD/findByPat`,{ 
        method: 'GET', 
        headers: { 'Content-Type':'application/json','patient': patient}
    });
}
