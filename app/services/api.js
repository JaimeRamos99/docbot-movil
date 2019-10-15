/**
 * Inicio de sesión del usuario-pacient
 * @param {*} documentNumber 
 * @param {*} password 
 */
export function signIn(documentNumber,password){ 
    console.log(JSON.stringify({ documentNumber, password }));
    return fetch(`https://api-rest-botic.herokuapp.com/api/patients/login`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ documentNumber, password })
    });
}

export function GetGoals(pat){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/goals/buscar`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ pat })
    });
}