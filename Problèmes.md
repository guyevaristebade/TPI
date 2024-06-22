# Journal des Problèmes et Solutions

Ce fichier va me servir pour plus tard, lorsque je rencontrerai des problèmes similaire je saurai comment je les es t résolu  

## Date: 2024-04-22

### Problème 1:

```plaintext
Le problème se situe dans l'implémentation du back-end dans le front.
Je m'explique lorsque je fais une connexion mon middleware qui s'occupe de se travail génère un token qu'il stocke dans un cookie. Le truc c'est que quand je test mes différentes routes d'authentification sur postman tout va bien, le cookie est présent. A l'inverse quand je test dans mon front je ne retrouve pas le cookie dans l'onglet appli de mon navigateur.

J'ai testé avec: 
- Chrome 
- Firefoxe 

Pour l'instant je cherche mais je n'ai pas de piste et c'est très frustrant 
```

### Solution au problème 1:

### Remaqrques



## Date: 2024-04-25

### Problème 1:

```txt
Internal Server Error: E11000 duplicate key error collection: BudgetBuddyAgentEquipmentDB-dev.devices index: date_1 dup
key: { date: new Date(1355266800000) }

E11000 duplicate key error collection: BudgetBuddyAgentEquipmentDB-dev.devices index: brand_1 dup key: { brand: "Motorola" }

```

Cette erreur proviens du fait qu'il y a des éléments dans la bd  qui on soit disant les même clé que l'élément que je souhaite enregistrer 


### Solution au problème 1:
le problème était lié au modèle de ma collection, en  effet il y avait l'attribut unique un peu partout. C'est ce paramètre qui causait des problèmes 

j'ai donc supprimé la collection et refait le processus d'insertion 


## Date : 27-04-2024

### Problème : 
``` js 
{
    "message": "Internal Server error Cast to ObjectId failed for value \"{ userId: '662cc7a2686f0a154a3af285' }\" (type Object) at path \"_id\" for model \"agent\""
}
```

j'ai modifié tous mes controleurs  dont celui qui s'occupe de supprimer un utilisateur. 

### Solution 
J'ai eu à changer le paramètre de mon controleur car le mongoose recevait ceci ``` code { userId: '662cc7a2686f0a154a3af285' }``` au lieu de ``` code { _id : '662cc7a2686f0a154a3af285' }```

```javascript
export const deleteUser = async (userId) => {
  try {

    const agent = await agentModel.findOneAndDelete(sanitizeFilter(userId));
    if (!agent) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User deleted successfully" };

  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server error " + e.message };
  }
};


export const deleteUser = async (_id) => {
  try {

    const agent = await agentModel.findOneAndDelete(sanitizeFilter(_id));
    if (!agent) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User deleted successfully" };

  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server error " + e.message };
  }
};
```

### Remarque 
Faire attention au paramètre qu'on utilise dans les différentes fonctions qu'offre mongoose



### Problème 

```textplaint

node:_http_outgoing:696
    throw new ERR_HTTP_HEADERS_SENT('set');
          ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

  code: 'ERR_HTTP_HEADERS_SENT'

```

lorsqu'on soumet un champs de modification vide il se soumet
