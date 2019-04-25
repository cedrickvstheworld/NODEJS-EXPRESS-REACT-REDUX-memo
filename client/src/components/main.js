import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { fetch_posts } from '../actions/fetch_posts_action';

//components
import NewMemo from  './main_components/new_memo';
import Posts from './main_components/posts';

//static
import '../static/css/main_index.css';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      is_authenticated: false
    }
    this.check_auth();
    this.show_add_memo_modal = this.show_add_memo_modal.bind(this);
  }


  check_auth() {
      axios.get('/api/main')
        .then((response) => {
            this.setState({is_authenticated: true})
        })
        .catch((error) => {
            console.log(error);

          return window.location ='/';
            // this.setState({is_authenticated: false})
        })
  }

  show_add_memo_modal(event) {
    event.preventDefault();
    let modal_container = document.getElementById("new-memo-modal");

    modal_container.style.display = 'grid';
  }

  render() {
    
    if (this.state.is_authenticated) {
      document.getElementById('main-container').style.display = "block";
    }
    return (
      <div className="Main">
        <div id="main-container" className="grey darken-4">
          <div id="central-container" className="row">
            <div className="container">

              <div className="col s3">
                <div>
                <i id="add-memo-toggler" onClick={this.show_add_memo_modal} className="medium material-icons light-blue-text text-lighten-1 animated bounceInLeft">create</i>
                </div>
              </div>

              <div className="col s6">
                {/* POSTS */}
                <Posts />
                {/* POSTS */}
              </div>

            </div>
          </div>
        </div>

      {/* MODALS */}
        <NewMemo />
      {/* MODALS */}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  post: state.posts.item
});

export default connect(mapStateToProps, {fetch_posts})(Main);
