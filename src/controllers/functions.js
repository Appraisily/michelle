export const availableFunctions = {
  sayHello: {
    name: 'sayHello',
    description: 'Responds with a hello message',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the person to greet'
        }
      },
      required: ['name']
    }
  }
};

export const executeFunctions = async (functionName, parameters) => {
  switch (functionName) {
    case 'sayHello':
      return `Hello, ${parameters.name}! The time is ${new Date().toLocaleTimeString()}`;
    default:
      throw new Error(`Function ${functionName} not found`);
  }
};