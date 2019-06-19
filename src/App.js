import React, { useState } from "react";
import {
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

function App() {
  const [activities, setActivities] = useState([]);

  const [input, setInput] = useState("");
  const handleChange = e => setInput(e.target.value);

  const [modalOpen, setModalStatus] = useState(false);
  const toggleModal = () => setModalStatus(!modalOpen);

  const addActivity = e => {
    e.preventDefault();
    const newActivities = [...activities, { text: input }];
    setActivities(newActivities);
    setModalStatus(false);
    setInput("");
  };

  const completeActivity = index => {
    const newActivity = [...activities];
    newActivity[index].isCompleted = !activities.isCompleted;
    setActivities(newActivity);
  };

  const activityList = activities.length ? (
    activities.map((activity, index) => {
      return (
        <ListGroupItem key={index}>
          <div
            style={{
              textDecoration: activities.isCompleted ? "line-through" : ""
            }}
          >
            {activity.text}
          </div>
          <div className="actions">
            <Button color="link" onClick={completeActivity}>
              {activities.isCompleted ? "Redo" : "Done"}
            </Button>
          </div>
        </ListGroupItem>
      );
    })
  ) : (
    <div className="no-activity">No activity found</div>
  );

  const modal = modalOpen ? (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader>New activity</ModalHeader>
      <ModalBody>
        <form onSubmit={addActivity}>
          <Input value={input} onChange={handleChange} />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button outline onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;

  return (
    <div className="App">
      <header>
        <h6 className="brand">reacthooks</h6>
        <Button outline onClick={toggleModal} color="primary">
          New activity
        </Button>
      </header>
      <section className="activity-list">
        <ListGroup>{activityList}</ListGroup>
      </section>
      {modal}
    </div>
  );
}

export default App;
