import { useEffect, useRef, useState } from 'react';
import { ErrorType } from '../types/ErrorType';
import { Todo } from '../types/Todo';

type Props = {
  handleAddTodo: (todoTitle: string) => Promise<void>;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorType>>;
  tempTodo: Todo | null;
};

export const Header: React.FC<Props> = props => {
  const [inputValue, setInputValue] = useState('');
  const { handleAddTodo, setErrorMessage, tempTodo } = props;

  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      setErrorMessage(ErrorType.EmptyTitle);

      return;
    }

    try {
      await handleAddTodo(inputValue.trim());
      setInputValue('');
    } catch (err) {}
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
          disabled={!!tempTodo}
          // disabled={todoIdinEditMode === 0}
          ref={inputNameRef}
          // disabled={!!loadingTodoId}
        />
      </form>
    </header>
  );
};
