
// Package jsonwebtoken pour attribuer un token à un utilisateur 
const jwt = require('jsonwebtoken');

// Middleware appliqué à toutes les routes afin de les sécuriser
module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header de la requête autorisation, on récupère uniquement le deuxième élément du tableau (car split)
    const token = req.headers.authorization.split(' ')[1];
    // On vérifie le token décodé avec la clé secrète initiéé avec la création du token encodé initialement
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // On vérifie que le userId envoyé avec la requête correspond au userId encodé dans le token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      // Si tout est valide on passe au middleware suivant
      next();
    }
  // Récupère les erreurs
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};