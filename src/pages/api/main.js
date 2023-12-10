import courseData from './1.json'
export default function GET(req, res) {
  res.status(200).json({ name: '12', data: courseData })
}