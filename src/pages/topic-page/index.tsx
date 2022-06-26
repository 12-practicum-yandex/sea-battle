import { AuthPageLayout } from '@layouts';
import { useGetCommentsQuery, useGetTopicsQuery, useCreateCommentMutation } from '@api/forum';
import { useParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { ForumCategoryCard } from '@components/forum-category-card';
import { Comment, CommentForm } from '@components';
import { useGetUserQuery } from '@api/auth';
import { Topic } from '@api/forum/types';
import { CircularProgress, CardHeader } from '@mui/material';

export const TopicPage = () => {
  const params = useParams() as { id: string };
  const { data: allTopics } = useGetTopicsQuery();
  const { data: userData } = useGetUserQuery();
  const {
    data: comments = [],
    isLoading: isLoadingComment,
    refetch,
  } = useGetCommentsQuery({
    id: +(params?.id || 0),
  });

  const [createComment] = useCreateCommentMutation();

  const currentTopic = useMemo<Topic | undefined>(() => {
    if (params?.id) {
      return allTopics?.find(({ id }) => +params?.id === id);
    }
    return undefined;
  }, [allTopics, params]);

  const handleSubmitComment = useCallback(
    async (values) => {
      await createComment({
        ...values,
        userId: userData?.id,
        userLogin: userData?.login,
        topicId: currentTopic?.id,
      });
      await refetch();
    },
    [currentTopic, userData],
  );

  return (
    <AuthPageLayout>
      {currentTopic && (
        <>
          <ForumCategoryCard title={currentTopic.title} textPreview={currentTopic.description} />
          <CommentForm onSubmit={handleSubmitComment} isLoading={false} />
          {isLoadingComment ? (
            <CircularProgress />
          ) : (
            <>
              {comments?.length ? (
                <>
                  {comments?.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment.comment}
                      userLogin={String(comment.user_id)}
                    />
                  ))}
                </>
              ) : (
                <CardHeader>Комментарии не найдены</CardHeader>
              )}
            </>
          )}
        </>
      )}
    </AuthPageLayout>
  );
};
