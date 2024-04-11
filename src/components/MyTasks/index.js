import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {
  BgContainer,
  TaskDivContainer,
  FormContainer,
  FormHeading,
  InputDivContainer,
  Label,
  Input,
  SelectInput,
  OptionInput,
  FormBtn,
  AddTaskDiv,
  MainHeading,
  TagListUl,
  TagList,
  TagBtn,
  TaskUl,
  TaskListLi,
  TaskText,
  TaskTag,
  NoTaskText,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    userInputText: '',
    userInputTag: tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  onChangeUserInput = event => {
    this.setState({userInputText: event.target.value})
  }

  onChangeUserInputTag = event => {
    this.setState({userInputTag: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {userInputText, userInputTag} = this.state
    const newTask = {
      id: uuidv4(),
      task: userInputText,
      tag: userInputTag,
    }
    if (userInputText.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        userInputText: '',
        userInputTag: '',
      }))
    }
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTask = () => {
    const {userInputText, userInputTag} = this.state
    return (
      <TaskDivContainer>
        <FormContainer onSubmit={this.onSubmitForm}>
          <FormHeading>Create a task!</FormHeading>
          <InputDivContainer>
            <Label htmlFor="userInputText">Task</Label>
            <Input
              type="text"
              placeholder="Enter the task here"
              onChange={this.onChangeUserInput}
              value={userInputText}
              id="userInputText"
            />
          </InputDivContainer>
          <InputDivContainer>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.onChangeUserInputTag}
              value={userInputTag}
              id="selectTag"
            >
              {tagsList.map(each => (
                <OptionInput value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </InputDivContainer>
          <FormBtn type="submit">Add Task</FormBtn>
        </FormContainer>
      </TaskDivContainer>
    )
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  renderTaskResult = () => {
    const {taskList, activeTag} = this.state

    return (
      <AddTaskDiv>
        <MainHeading>Tags</MainHeading>
        <TagListUl>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagList key={each.optionId}>
                <TagBtn
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagBtn>
              </TagList>
            )
          })}
        </TagListUl>
        <MainHeading>Tasks</MainHeading>
        <TaskUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUl>
      </AddTaskDiv>
    )
  }

  render() {
    return (
      <BgContainer>
        {this.renderCreateTask()}
        {this.renderTaskResult()}
      </BgContainer>
    )
  }
}

export default MyTasks
