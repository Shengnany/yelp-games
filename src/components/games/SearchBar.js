import React from 'react';
import { FormLabel, FormControl, Container,Form,Button } from 'react-bootstrap';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <Container>
        <Form className="d-flex mt-2" onSubmit={this.onFormSubmit} >
            <FormControl
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
              placeholder="Search"
              className="md-2"
            />
            <Button variant="outline-success">Search</Button>
        </Form>
        </ Container>
       );
  }
}
export default SearchBar;
