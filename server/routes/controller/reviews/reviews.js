const { User } = require('../../../models/User');
const { Book } = require('../../../models/Book');
const { Review } = require('../../../models/Review');
module.exports.createReview = async (req, res, next) => {
  const { content, rate, userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');
    const newReview = new Review({ rate, content, user: userId, book: bookId });
    book.rate = (book.rate * book.rateCount + rate) / (book.rateCount + 1);
    book.rateCount = book.rateCount + 1;
    const [review, newBook] = await Promise.all([
      newReview.save(),
      book.save(),
    ]);
    const retReview = await review
      .populate('book', ['rate', 'rateCount'])
      .populate('user')
      .execPopulate();

    return res.status(200).json(retReview);
  } catch (err) {
    if (err.message === 'User not found')
      return res.status(404).json({ message: err.message });
    if (err.message === 'Book not found')
      return res.status(404).json({ message: err.message });
    return res.status(500).json(err);
  }
};

module.exports.getReviewsByBookId = (req, res, next) => {
  const { bookId } = req.params;
  Book.findById(bookId)
    .then((book) => {
      if (!book)
        return Promise.reject({ status: 404, message: 'Book not found' });
      return Review.find({ book: bookId })
        .populate('book', ['rate', 'rateCount'])
        .populate('user');
    })
    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => {
      if (err.status) return res.status(err.status).json(err.message);
      return res.status(500).json(err);
    });
};

module.exports.updateReview = async (req, res, next) => {
  const { content, rate, bookId, reviewId } = req.body;
  console.log(req.body);

  try {
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');
    const review = await Review.findById(reviewId);
    book.rate =
      (book.rate * book.rateCount + (rate - review.rate)) / book.rateCount;
    review.content = content;
    review.rate = rate;
    const [newReview, newBook] = await Promise.all([
      review.save(),
      book.save(),
    ]);
    const retReview = await newReview
      .populate('book', ['rate', 'rateCount'])
      .populate('user')
      .execPopulate();
    return res.status(200).json(retReview);
  } catch (err) {
    if (err.message === 'Book not found')
      return res.status(404).json({ message: err.message });
    return res.status(500).json(err);
  }
};

module.exports.deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) throw new Error('Review not found');
    const book = await Book.findById(review.book);
    if (!book) throw new Error('Book not found');
    if (book.rateCount === 1) {
      book.rate = 0;
      book.rateCount = 0;
    } else {
      book.rate =
        (book.rate * book.rateCount - review.rate) / (book.rateCount - 1);
      book.rateCount = book.rateCount - 1;
    }

    await book.save();
    const deleteReview = await Review.deleteOne({ _id: reviewId });
    if (deleteReview.n === 0)
      return Promise.reject({ status: 404, message: 'Review not found' });

    return res
      .status(200)
      .json({
        message: 'Delete Successfully',
        reviewId: reviewId,
        rateCount: book.rateCount,
        rate: book.rate,
      });
  } catch (err) {
    if (err.message === 'Review not found')
      return res.status(404).json({ message: err.message });
    if (err.message === 'Book not found')
      return res.status(404).json({ message: err.message });
    return res.status(500).json(err);
  }
};
