<template>
  <div class="feedback view">
    <div class="container">
      <lm-card class="feedback-container">
        <!-- 
          Feedback metainfo
        -->
        <h2 class="title">{{ $t('feedback.feedback') }}</h2>
        <p class="description">{{$t('feedback.youWillReceiveAnAwardIfYouWillOutTheQuestions')}}</p>
        <p class="description">{{$t('feedback.keepInMindThatYouCanFillOutTheseQuestionsOnlyOnce')}}</p>
        <p
          class="description"
        >{{$t('feedback.allAnswersAreCompletelyAnonymousTheOnlyDataWeStoreIsIfYouHaveAnsweredAlready')}}</p>
        <p class="description">
          <strong>* = {{$t('feedback.required')}}</strong>
        </p>

        <!-- 
          Categories
        -->
        <div class="category" v-for="(category, categoryIndex) in categories" :key="categoryIndex">
          <lm-seperator :mtop="15" :mbottom="10" />
          <h2 class="title">
            {{ $t('category.' + category.title) }}
            <span
              class="description"
            >{{ ++categoryIndex + '/' + categories.length }}</span>
          </h2>

          <!-- 
            Questions
          -->
          <div
            class="question"
            v-for="(question, questionIndex) in category.questions"
            :key="questionIndex"
          >
            <p>{{ question.isRequired ? '*': '' }}{{ $t('question.' + question.name) }}</p>
            <lm-number-rating
              @value-update="(value) => question.value = value"
              v-if="question.type === 'number'"
            />
            <lm-custom-rating
              @value-update="(value) => question.value = value"
              v-else-if="question.type === 'custom'"
              :customs="question.customs"
            />
            <lm-text-area
              @value-update="(value) => question.value = value"
              v-else-if="question.type === 'text'"
            />
          </div>
        </div>
      </lm-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { LmCard, LmSeperator, LmButton } from '@luminu/components';
import LmInput from '@/components/luminu/Input.vue';
import LmNumberRating from '@/components/luminu/NumberRating.vue';
import LmCustomRating from '@/components/luminu/CustomRating.vue';
import LmTextArea from '@/components/luminu/TextArea.vue';
import { addTranslationsFromCategories } from '../translations';
import { Category } from '../types/category';

export default Vue.extend({
  name: 'feedback-with-key',
  components: {
    LmCard,
    LmSeperator,
    LmInput,
    LmNumberRating,
    LmCustomRating,
    LmTextArea,
    LmButton,
  },
  beforeMount() {
    addTranslationsFromCategories(this.categories);
  },
  data: () => ({
    categories: [
      {
        title: 'general',
        translations: {
          en: 'General',
          de: 'Allgemein',
        },
        questions: [
          {
            name: 'howSatisfiedAreYouWithOurNetwork',
            type: 'number',
            isRequired: true,
            customs: [],
            translations: {
              en: 'How satisfied are you with our network?',
              de: 'Wie zufrieden bist du mit unserem Netzwerk?',
            },
            value: '',
          },
          {
            name: 'whatIsYourFavoriteGamemode',
            type: 'custom',
            isRequired: true,
            customs: ['Bedwars', 'Rush', 'SkyPvP'],
            translations: {
              en: 'What is your favorite gamemode?',
              de: 'Was ist dein liebster Spielmodus?',
            },
            value: '',
          },
          {
            name: 'whatWouldYouLikeToChange',
            type: 'text',
            isRequired: false,
            customs: [],
            translations: {
              en: 'What is your favorite gamemode?',
              de: 'Was ist dein liebster Spielmodus?',
            },
            value: '',
          },
        ],
      },
      {
        title: 'Hello',
        translations: {
          en: 'okay',
          de: 'xd',
        },
        questions: [
          {
            name: 'howSatisfiedAreYouWithOurNetwork',
            type: 'number',
            isRequired: true,
            customs: [],
            translations: {
              en: 'How satisfied are you with our network?',
              de: 'Wie zufrieden bist du mit unserem Netzwerk?',
            },
            value: '',
          },
          {
            name: 'whatIsYourFavoriteGamemode',
            type: 'custom',
            isRequired: true,
            customs: ['Bedwars', 'Rush', 'SkyPvP'],
            translations: {
              en: 'What is your favorite gamemode?',
              de: 'Was ist dein liebster Spielmodus?',
            },
            value: '',
          },
          {
            name: 'whatWouldYouLikeToChange',
            type: 'text',
            isRequired: false,
            customs: [],
            translations: {
              en: 'What is your favorite gamemode?',
              de: 'Was ist dein liebster Spielmodus?',
            },
            value: '',
          },
        ],
      },
    ] as Category[],
  }),
});
</script>

<style lang="scss" scoped>
.feedback {
  .feedback-container {
    position: relative;
    width: 760px;
    margin: 0 auto;

    @media screen and (max-width: 820px) {
      width: 100%;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .category {
      .question:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
