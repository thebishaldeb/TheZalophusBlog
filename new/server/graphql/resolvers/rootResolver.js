const blogResolver=require('./blog');
const indexResolver=require('./index');

const rootResolver={
    ...blogResolver,
    ...indexResolver
}
module.exports=rootResolver;