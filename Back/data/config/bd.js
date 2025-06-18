const { MongoClient, ServerApiVersion } = require("mongodb");

// URI de conexión a MongoDB Atlas (Modificar en caso de ser necesario).

const uri = "mongodb+srv://julifer2435:Fercho.23dic04@clusterintegradora.p1kmcdn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterIntegradora";

// Crear instancia del cliente
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection;

//Funcion de Conexion a Mongo
async function connectToDatabase() {
  if (!dbConnection) {
    try {
      await client.connect();
      dbConnection = client.db("Integradora"); // Especificar nombre de la BD a usar
      console.log("Conexión establecida con MongoDB");
    } catch (error) {
      console.error("Error al conectar con MongoDB:", error);
      throw error;
    }
  }
  return dbConnection;
}

export default connectToDatabase;
