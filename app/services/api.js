const DBAAPI = 'https://api-rest-botic.herokuapp.com/api';
const BayesianModelAPI = 'https://modelobayesiano.herokuapp.com/getmessages/';

/**
 * Inicio de sesión del usuario-pacient
 * @param {*} documentNumber 
 * @param {*} password 
 */
export function signIn(documentNumber,password){ 
    return fetch(DBAAPI + `/patients/login`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ documentNumber, password })
    });
}

export function updateLoggedUser(id, logged){ 
    return fetch(DBAAPI + `/patients/logged`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, logged })
    });
}

export function GetPatient(idPatient){ 
    return fetch(DBAAPI + `/patients/login`,{ 
        method: 'GET', 
        headers: { 'Content-Type':'application/json','id': idPatient}
    });
}

export function UpdatePatient(id, name, lastName, age, height, avatar, steps, email){ 
    return fetch(DBAAPI + `/patients/updatepat`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, name, lastName, age, height, avatar, steps, email })
    });
}

export function UpdatePatientWeight(id, weight, date){ 
    return fetch(DBAAPI + `/medicalInfos/updateweight`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, weight, date })
    });
}

export function UpdatePatientToken(id, token){
    console.log(JSON.stringify({ id, token }))
    return fetch(DBAAPI + `/patients/token`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, token })
    });
}

/**
 * 
 * @param {*} pat 
 */
export function GetGoals(pat){ 
    return fetch(DBAAPI + `/goals/buscar`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ pat })
    });
}

export function UpdateGoal(id, progress, date, state, nMessages, complianceDate){ 
    return fetch(DBAAPI + `/goals`,{ 
        method: 'PUT', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ id, progress, date, state, nMessages, complianceDate })
    });
}

/**
 * 
 * @param {*} patient 
 * @param {*} type 
 */
export function GetParaclinicals(patient, type){ 
    return fetch(DBAAPI + `/paraclinicals/buscar`,{ 
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
export function CreateParaclinical(patient, type, value, date){ 
    return fetch(DBAAPI + `/paraclinicals`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ patient, type, value, date })
    });
}

/**
 * Obtener mensajes enviados por el doctor
 * @param {*} patient 
 */
export function GetMessagesD(patient){ 
    return fetch(DBAAPI + `/messagesD/findByPat`,{ 
        method: 'GET', 
        headers: { 'Content-Type':'application/json','patient': patient}
    });
}

/**
 * Obtener mensajes lego mb
 * @param {*} patient 
 */
export function getLego(patient){ 
    return fetch(BayesianModelAPI + patient,{ 
    });
}