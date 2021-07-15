import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FoodData } from '../../pages/Dashboard';
import { useRef } from 'react';

interface ModalEditFoodProps {
  isOpen: boolean;
  onSetIsOpen: () => void;
  editingFood: FoodData;
  onHandleUpdateFood: (food: FoodData) => Promise<void>;
}

export const ModalEditFood = ({
  isOpen,
  onSetIsOpen,
  editingFood,
  onHandleUpdateFood,
}: ModalEditFoodProps) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: FoodData) => {
    onHandleUpdateFood(data);
    onSetIsOpen();
  };

  return (
    <Modal isOpen={isOpen} onSetIsOpen={onSetIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
