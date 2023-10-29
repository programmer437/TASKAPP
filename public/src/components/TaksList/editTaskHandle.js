

export default function EditTaskHandle({id,history}) {

  console.log(id)

    history(`/tasks/${id}`);
  }