import { registerAs } from "@nestjs/config";
export default registerAs('mongo', () => ({
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        resource: process.env.MONGO_RESOURCE,
        uri: process.env.MONGO_URI,
}))