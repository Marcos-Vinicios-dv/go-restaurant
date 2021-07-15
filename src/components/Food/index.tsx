import { FiEdit3, FiTrash } from 'react-icons/fi';

import { FoodData } from '../../pages/Dashboard';
import { Container } from './styles';
import api from '../../services/api';
import { useState } from 'react';

interface FoodProps {
  food: FoodData;
  onHandleDelete: (id: number) => void;
  onHandleEditFood: (food: FoodData) => void;
}

export const Food = ({ food, onHandleDelete, onHandleEditFood }: FoodProps) => {
  const [foodIsAvailable, setFoodIsAvailable] = useState(() => food.available);

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !foodIsAvailable,
    });

    setFoodIsAvailable(!foodIsAvailable);
  };

  const setEditingFood = () => {
    onHandleEditFood(food);
  };

  return (
    <Container available={foodIsAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => onHandleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{foodIsAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={foodIsAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};
