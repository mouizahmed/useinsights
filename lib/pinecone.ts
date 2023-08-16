import { PineconeClient } from "@pinecone-database/pinecone";      

const pinecone = new PineconeClient();      
await pinecone.init({      
	environment: "us-west1-gcp-free",      
	apiKey: "99361a4a-769b-47ef-8ba1-f5f95f07c1db",      
});      
const pineconeIndex = pinecone.Index("useinsights");

export default pineconeIndex;