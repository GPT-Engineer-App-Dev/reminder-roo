import { Container, VStack, Text, Input, Button, List, ListItem, ListIcon, IconButton, useColorModeValue, Flex, Box } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlus, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Container maxW="container.xl" p={5}>
      <Flex justifyContent="space-between" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <IconButton aria-label="Menu" icon={<FaBars />} />
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton aria-label="Add task" icon={<FaPlus />} onClick={handleAddTask} colorScheme="blue" ml={2} />
        </Flex>
        <List spacing={3} w="full" bg={bg} p={4} borderRadius="md" boxShadow="md">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text>{task.text}</Text>
              <Box>
                <IconButton aria-label="Edit task" icon={<FaEdit />} onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))} colorScheme="yellow" mr={2} />
                <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;