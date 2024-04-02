const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TodoSchema = new mongoose.Schema(
  {
    // id 필드는 스키마에서 안만들어도 plugin()에서 설정하면 해당 필드 자동 생성
    task: { type: String },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    // mongoose를 통해서 데이터를 삽입하면 '__v' 필드가 생긴다.
    // 의미하는 바는 버전 키라고 하는데 문서의 내부 개정판을 설명하고 기본 값은 0이다.
    // 삭제할려면 versionKey값을 false로 설정
    versionKey: false,
  }
);
TodoSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Todo", TodoSchema);
