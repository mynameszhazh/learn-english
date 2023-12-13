import courseData from './1.json'
export default function GET(req, res) {
  res.status(200).json({
    code: 1, data: {
      name: '第一节',
      statements: courseData
    }
  })
}