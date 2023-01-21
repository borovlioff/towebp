import path from "path"
import multer from 'fastify-multer' // or import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })
import fastifyStatic from "@fastify/static";
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '/'),
    //prefix: '/', // optional: default '/'
  })

fastify.register(multer.contentParser)

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html');
  })

fastify.post('/image', {preHandler: upload.array("image")}, (req,reply)=>{
    console.log(req["files"])
    reply.send(req.body)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()