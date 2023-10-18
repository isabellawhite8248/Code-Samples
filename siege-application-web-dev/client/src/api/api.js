/**
 * Mock api that is place for now so that we don't have to depend on backend to load comments onto the screen 
 */

// mock user data
export const getComments = async () => {
    return [
      {
        id: "1",
        body: "First comment test",
        username: "siegeTraderOne",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "2",
        body: "Second comment test",
        username: "siegeTraderTwo",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "3",
        body: "First comment first child test",
        username: "siegeTraderTwo",
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "4",
        body: "Second comment second child test",
        username: "siegeTraderOne",
        userId: "2",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
    ];
  };
  
  /**
   * function that creates a new comment on the mock backend 
   * @param text - the comment text
   * @param parentId - the parent iD of the comment 
   * @returns - a new comment Json wrapped in Promise 
   */
  export const createComment = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "siegeTraderOne",
      createdAt: new Date().toISOString(),
    };
  };
  
  /**
   * function that updates a new comment on the mock backend
   * @param text - the new text of the comment
   * @returns - the updated comment 
   */
  export const updateComment = async (text) => {
    return { text };
  };
  
  /**
   * function that deletes a comment on the mock backend 
   * @returns - empty object
   */
  export const deleteComment = async () => {
    return {};
  };