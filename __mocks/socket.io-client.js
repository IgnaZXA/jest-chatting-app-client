const socket = 
{ 
  on: jest.fn(), 
  emit: jest.fn(), 
  disconnect: jest.fn(), 
};

export default jest.fn(()=> socket)