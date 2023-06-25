import { ChangeEvent, useState } from "react";
import clipboard from "../assets/clipboard.svg";
import plus from "../assets/plus.svg";
import { TaskModel } from "../model/task.model";
import styles from "./Task.module.css";
import { TrashIcon } from "./icons/Icons";

export default function Task() {

  const [ taskName, setTaskName ] = useState('');
  const [ taskList, setTaskList ] = useState<TaskModel[]>([]);
  const [ taskCounter, setTaskCounter ] = useState(0);
  const [ taskCounterCreated, setTaskCounterCreated ] = useState(0);
  const [ taskCounterFinished, setTaskCounterFinished ] = useState(0);
  const [ isCreateButtonDisabled, setIsCreateButtonDisabled ] = useState(true);

  const handleTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCreateButtonDisabled(event.target.value == null || event.target.value.length <= 0);
    setTaskName(event.target.value);
  };

  const handleButtonClick = () => {
    const taskNameValue = taskName;

    const add: TaskModel = {
      id: taskList.length + 1,
      title: taskNameValue,
      value: false,
      active: true,
      cardClass: `${styles.taskCard} fadeIn`
    }

    setTaskList([add, ...taskList]);
    setTaskCounter(taskCounter + 1);
    setTaskCounterCreated(taskCounterCreated + 1);
    setIsCreateButtonDisabled(true);
    setTaskName("");
  };

  const handleToggleFinishClick = (id: number) => {
    const list = [...taskList];

    list.forEach(element => {
      if (element.id === id) {
        element.value = !element.value;
        element.cardClass = `${element.cardClass} ${styles.taskRadioFinishedChecked}`
        setTaskCounterFinished(element.value ? taskCounterFinished + 1 : taskCounter - 1);
      }
    });

    setTaskList(list);
  };

  const handlePreToggleTrashClick = (id: number) => {
    const list = [...taskList];

    list.forEach(element => {
      if (element.id === id) {
        element.cardClass = element.cardClass.replace('fadeIn', 'fadeOut');
      }
    });

    setTaskList(list);
  };

  const handleToggleTrashClick = (id: number) => {
    handlePreToggleTrashClick(id);
    const list = [...taskList];

    // It is necessary for wait fadeout transition
    setTimeout(() => {
      list.forEach(element => {
        if (element.id === id) {
          element.active = !element.active;
          setTaskCounter(element.active ? taskCounter + 1 : taskCounter - 1);
          setTaskCounterCreated(element.active ? taskCounterCreated + 1 : taskCounterCreated - 1);
          setTaskCounterFinished(element.value ? taskCounterFinished - 1 : taskCounterFinished);
        }
      });
      
      setTaskList(list);
    }, 1000);
  };

  const handleTaskList = () => {

    if (taskList.filter(elem => elem.active).length == 0) {
      return (            
        <>
          <img alt="Nenhuma tarefa" src={clipboard} width={56} height={56} />
          <h4 className={styles.tasksTitle}>Você ainda não tem tarefas cadastradas</h4>
          <h5 className={styles.tasksSubTitle}>Crie tarefas e organize seus itens a fazer</h5>
        </>
      )
    }

    return (
      <ul>
        { 
          taskList.filter((elem) => elem.active).map((elem) => {
            return (
              <li key={elem.id} className={ elem.cardClass }>
                <div className={ styles.tasksContentCard }>
                  <div className={ styles.taskRadioFinished }>
                      <input type="checkbox" onChange={ () => handleToggleFinishClick(elem.id) } value={elem.value.toString()} />
                  </div>
                  <div className={ styles.taskText }>
                    { elem.title }
                  </div>
                  <div className={ styles.taskTrash }>
                    <div onClick={ () => handleToggleTrashClick(elem.id) }>
                      <TrashIcon />
                    </div>
                  </div>
                </div>
              </li>
            )
          }) 
        }
      </ul>
    )
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionContent}>
          <form>
            <div className={styles.taskInputs}>
              <input className={styles.inputTaskDescription} type="text" placeholder="Adicione uma nova tarefa" onChange={ handleTaskName } value={ taskName } required />
              <button className={styles.buttonCreateNewTask} onClick={ handleButtonClick } disabled={ isCreateButtonDisabled }>
                Criar
                <img alt="Ícone adicionar" src={plus} />
              </button>
            </div>
          </form>

        <div className={styles.tasksBody}>
          <div className={styles.taskStatus}>
            <div className={styles.taskStatusCreated}>
              Tarefas Criadas
              <span className={styles.taskStatusCounter}>{ taskCounterCreated }</span>
            </div>
            <div className={styles.taskStatusFinished}>
              Concluídas
              <span className={styles.taskStatusCounter}>{ taskCounterFinished } de { taskCounter }</span>
            </div>
          </div>

          <hr className={styles.styledHr} />

          <div className={styles.tasksContent}>
            { handleTaskList() }
          </div>
        </div>
      </div>
    </section>
  );
}
