import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ReactPlayer from "react-player/vimeo";

import getCourseById from "services/getCourseById";
import getModuleById from "services/getModuleById";
import getMaterialById from "services/getMaterialById";
import getCommentsByMaterialId from "services/getCommentsByMaterialId";
import postComment from "services/postComment";

import CourseNav from "components/CourseNav";
import CourseIcons from "components/CourseIcons";

import "./styles.css";
import setMaterialComplete from "services/setMaterialComplete";

function MaterialContentSection({ courseId, course, isActive = false }) {
  return isActive ? (
    <section className="flex w-full items-center justify-center">
      <CourseNav courseId={courseId} units={course.modulos} />
    </section>
  ) : (
    <></>
  );
}

function MaterialAboutSection({ isActive = true, moduleId }) {
  const [about, setAbout] = useState();
  useEffect(() => {
    getModuleById(moduleId).then((response) => setAbout(response));
  }, [moduleId]);

  return isActive && about ? (
    <div className="w-full px-10 py-5">
      <h4 className="font text-lg font-semibold text-primary">Content</h4>
      <p>{about.contenido}</p>
      <h4 className="font mt-5 text-lg font-semibold text-primary">Goals</h4>
      <p>{about.objetivos}</p>
    </div>
  ) : (
    <></>
  );
}

function Replys({ reply }) {
  return (
    <div className="ml-5 mt-5 rounded-xl border border-gray-300 p-5 shadow-lg">
      <header className="flex justify-between border-b-2 border-accent">
        <div>
          <img url={reply.imagen} alt="" />
          <span className="font-semibold text-primary">{reply.alumno}</span>
        </div>
        <span>{reply.fecha}</span>
      </header>
      <p className="p-2">{reply.comentario}</p>
    </div>
  );
}

function Comment({ comment, userId, materialId, courseId }) {
  const [isActive, setIsActive] = useState(false);
  const [replyIsActive, setReplyActive] = useState(false);
  const [replys, setReplys] = useState(comment.respuestas);
  const [reply, setReply] = useState("");
  const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment) {
      const data = {
        UsuarioId: userId,
        MaterialId: materialId,
        CursoId: courseId,
        Comentario: reply,
        ComentarioId: comment.id,
      };
      const update = [...replys];
      update.push({
        id: 999999,
        alumno: user.nombre,
        fecha: "",
        respuestas: [],
        comentario: reply,
      });
      setReplys(update);
      setIsActive(true);
      postComment({ comment: data });
    }
  };

  return (
    <div
      key={comment.id}
      className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <header className="flex justify-between border-b-4 border-accent p-2">
        <div>
          <img url={comment.imagen} alt="" />
          <span className="font-semibold text-primary">{comment.alumno}</span>
        </div>
        <span>{comment.fecha}</span>
      </header>
      <p className="p-2">{comment.comentario}</p>
      <button
        onClick={() => setReplyActive(!replyIsActive)}
        className="pl-5 font-semibold text-primary"
      >
        reply
      </button>
      <button
        className="pl-5 font-semibold text-primary"
        onClick={() => setIsActive(!isActive)}
      >
        comments ({replys.length})
      </button>
      {isActive ? (
        replys.map((reply) => <Replys key={reply.id} reply={reply} />)
      ) : (
        <></>
      )}
      {replyIsActive ? (
        <form
          onSubmit={handleSubmit}
          className="mt-2 w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <textarea
            onChange={handleChange}
            type="textarea"
            value={reply}
            className="h-20 w-full rounded-xl border border-gray-400 p-1"
          />
          <button className="m-1 rounded-lg bg-accent p-2 text-primary">
            Reply
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

function CommentsList({ comments = [], userId, materialId, courseId }) {
  return comments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        userId={userId}
        materialId={materialId}
        courseId={courseId}
      />
    );
  });
}

function MaterialCommentsSection({ courseId, materialId, isActive = false }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment) {
      const data = {
        UsuarioId: user.id,
        MaterialId: materialId,
        CursoId: courseId,
        Comentario: comment,
        ComentarioId: 0,
      };
      const update = [...comments];
      update.push({
        id: 999999,
        alumno: user.nombre,
        fecha: "",
        respuestas: [],
        comentario: comment,
      });
      setComments(update);
      postComment({ comment: data });
    }
  };

  useEffect(() => {
    if (isActive)
      getCommentsByMaterialId({ id: materialId }).then((comments) =>
        setComments(comments)
      );
  }, [isActive, materialId]);

  return isActive ? (
    <div className="flex w-full flex-col items-center gap-5 bg-gray-100 p-5 md:p-10">
      <CommentsList
        comments={comments}
        courseId={courseId}
        materialId={materialId}
        userId={user.id}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <label>Leave a comment</label>
        <textarea
          onChange={handleChange}
          type="textarea"
          value={comment}
          className="h-20 w-full rounded-xl border border-gray-400 p-1"
        />
        <button className="m-1 rounded-lg bg-accent p-2 text-primary">
          Comment
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default function MaterialPage({ params }) {
  const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));
  const { courseId, moduleId, materialId } = params;
  const [course, setCourse] = useState({});
  const [material, setMaterial] = useState({});
  const [isActive, setIsActive] = useState({
    about: true,
    comments: false,
    content: false,
  });
  const [location, setLocation] = useLocation();

  useEffect(() => {
    getCourseById({ id: courseId }).then((course) => setCourse(course));
    getMaterialById({ id: materialId }).then((material) =>
      setMaterial(material)
    );
    setIsActive({ about: true, comments: false });
  }, [materialId, courseId]);

  function handleNextMaterial() {
    const moduleI = parseInt(moduleId);
    const materialI = parseInt(materialId);
    const currentModule = course.modulos.find(({ id }) => id === moduleI);
    const currentMaterial = currentModule.clases.find(
      ({ id }) => id === materialI
    );
    // const lastModule = course.modulos[course.modulos.length - 1];
    // const lastClass = lastModule.clases[lastModule.clases.length - 1];
    const currentModuleIndex = course.modulos.findIndex(
      (module) => module.id === moduleI
    );
    const currentMaterialIndex = currentModule.clases.findIndex(
      (material) => material.id === materialI
    );

    if (currentMaterial) {
      if (currentMaterialIndex === currentModule.clases.length - 1) {
        const nextModule = course.modulos[currentModuleIndex + 1];
        setLocation(
          `/courses/${courseId}/module/${nextModule.id}/material/${nextModule.clases[0].id}`
        );
      } else {
        const nextMaterial = currentModule.clases[currentMaterialIndex + 1];
        setLocation(
          `/courses/${courseId}/module/${moduleId}/material/${nextMaterial.id}`
        );
      }
    } else {
      if (currentMaterialIndex === currentModule.clases.length - 1) {
        const nextModule = course.modulos[currentModuleIndex + 1];
        setMaterialComplete({ materialId, classNum: material.claseNumero });
        setLocation(
          `/courses/${courseId}/module/${nextModule.id}/material/${nextModule.clases[0].id}`
        );
      } else {
        const nextMaterial = currentModule.clases[currentMaterialIndex + 1];
        setMaterialComplete({ materialId, classNum: material.claseNumero });
        setLocation(
          `/courses/${courseId}/module/${moduleId}/material/${nextMaterial.id}`
        );
      }
    }
  }

  return (
    <>
      <section className="flex max-h-[70vh] w-full gap-10 overflow-hidden bg-material text-white lg:p-10">
        <div className="hidden max-h-[70vh] w-1/3 flex-col lg:flex">
          <header className="flex max-h-[20vh] flex-col gap-5 pl-5">
            <Link href="/courses" className="flex items-center gap-2">
              <CourseIcons name="back" /> My classes
            </Link>

            <h2 className="text-lg font-medium">{course.nombre}</h2>
          </header>
          <CourseNav courseId={courseId} units={course.modulos} />
        </div>
        <div className="flex max-h-[70vh] w-full max-w-[50rem] flex-col items-center lg:w-2/3 lg:pl-5">
          <ReactPlayer
            url={material.linkVideo}
            height="100%"
            width="100%"
            controls
            className="aspect-video"
          />
          <div className="flex w-full items-center justify-between gap-2 p-5">
            <h1 className="font-Barlow text-2xl font-semibold text-white">
              {material.nombre}
            </h1>
            <button
              className="w-40 rounded-3xl bg-accent p-2 text-primary"
              onClick={() => handleNextMaterial()}
            >
              next class
            </button>
          </div>
        </div>
      </section>
      <section className=" bg-gray-100">
        <header className="h-20 w-full border-b border-gray-200 bg-white px-10 shadow-sm">
          <ul className="flex h-full items-center gap-5">
            <li
              className=" border-accent font-Barlow text-lg font-semibold text-primary hover:border-b-4"
              onClick={() =>
                setIsActive({ about: true, comments: false, content: false })
              }
            >
              About
            </li>
            <li
              className=" border-accent font-Barlow text-lg font-semibold text-primary hover:border-b-4"
              onClick={() =>
                setIsActive({ about: false, comments: true, content: false })
              }
            >
              Comments
            </li>
            <li
              className=" border-accent font-Barlow text-lg font-semibold text-primary hover:border-b-4"
              onClick={() =>
                setIsActive({ about: false, comments: false, content: true })
              }
            >
              Content
            </li>
          </ul>
        </header>
        <MaterialAboutSection isActive={isActive.about} moduleId={moduleId} />
        <MaterialCommentsSection
          courseId={courseId}
          materialId={material.id}
          isActive={isActive.comments}
        />
        <MaterialContentSection
          courseId={courseId}
          course={course}
          isActive={isActive.content}
        />
      </section>
    </>
  );
}
