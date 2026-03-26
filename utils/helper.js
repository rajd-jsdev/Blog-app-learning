export const buildCommentTree = (comments, parent = null) => {
  return comments
    .filter((c) => String(c.parent) === String(parent))
    .map((c) => ({
      ...c._doc,
      replies: buildCommentTree(comments, c._id),
    }));
};
