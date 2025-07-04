/* eslint-disable object-curly-newline */
export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'TrungQuanDev MERN Stack Board',
    description: 'Pro MERN stack Course',
    type: 'public', // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: ['column-id-01', 'column-id-03', 'column-id-02', 'column-id-04'], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: 'To Do Column 01',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Markdown Syntax (sẽ ở khóa nâng cao nhé)',
            cover: 'https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg',
            memberIds: ['test-user-id-01'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
          },
          { _id: 'card-id-02', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-03', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-04', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-05', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-06', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-07', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: 'Inprogress Column 02',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          { _id: 'card-id-08', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 08', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-09', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 09', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-10', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 10', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: 'Done Column 03',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13', 'card-id-14', 'card-id-15', 'card-id-16', 'card-id-17', 'card-id-18', 'card-id-19',],
        cards: [
          { _id: 'card-id-11', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 11', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-12', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 12', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-13', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 13', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-14', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 14', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-15', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 15', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-16', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 16', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-17', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 17', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-18', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 18', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-19', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 19', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
        ]
      },
      {
        // Sử dụng 1 placeholderCard để thực hiện giữ chỗ, cho column trống
        // Cấu trúc id của card nằm làm đơn giản không cần phức tạp
        // ColumnId-placeholder-card mỗi column chỉ có thể có tối đa 1 placeholderCard
        // Phải tạo đầy đủ các trường thông tin { _id, boardId, columnId, FE_PlaceholderCard }
        _id: 'column-id-04',
        boardId: 'board-id-01',
        title: 'Empty Column 04',
        cardOrderIds: ['column-id-04-placeholder-card',],
        cards: [
          { _id: 'column-id-04-placeholder-card', boardId: 'board-id-01', columnId: 'column-id-04', FE_PlaceholderCard: true },
        ]
      },
    ]
  }
}