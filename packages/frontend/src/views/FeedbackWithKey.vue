<template>
  <div class="feedback view">
    <lm-notification :activity="activity" :message="$t('response.' + message)" />

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
            <p>{{ $t('question.' + question.name) }}{{ question.isRequired ? '*': '' }}</p>
            <lm-number-rating
              @value-update="(value) => question.value = value"
              :isError="(hintsActivated && !question.value && question.isRequired)"
              v-if="question.type === 'number'"
            />
            <lm-custom-rating
              @value-update="(value) => question.value = value"
              :isError="(hintsActivated && !question.value && question.isRequired)"
              v-else-if="question.type === 'custom'"
              :customs="question.customs"
            />
            <lm-text-area
              @value-update="(value) => question.value = value"
              :isError="(hintsActivated && !question.value && question.isRequired)"
              v-else-if="question.type === 'text'"
            />
          </div>
        </div>

        <lm-seperator :mtop="15" :mbottom="10" />
        <div class="btn-group">
          <lm-button
            @click.native="submit()"
            size="big"
            type="success"
            :disabled="isDisabled"
            :text="$t('feedback.submit')"
          />
        </div>
      </lm-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import {
  LmCard,
  LmSeperator,
  LmButton,
  LmNotification,
} from '@luminu/components';
import LmInput from '@/components/luminu/Input.vue';
import LmNumberRating from '@/components/luminu/NumberRating.vue';
import LmCustomRating from '@/components/luminu/CustomRating.vue';
import LmTextArea from '@/components/luminu/TextArea.vue';
import { addTranslationsFromCategories } from '../translations';
import { Category } from '../types/category';
import {
  LOAD_CATEGORIES,
  GET_CATEGORIES,
  SAVE_KEY,
  SET_ERROR,
  GET_ERROR,
} from '../store';
import { api } from '../plugins/axios';

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
    LmNotification,
  },
  methods: {
    ...mapActions([LOAD_CATEGORIES]),
    ...mapMutations([SAVE_KEY, SET_ERROR]),
    ...mapGetters([GET_CATEGORIES, GET_ERROR]),
    checkInvalidAnswers() {
      let isInvalid = false;

      // using some to quick break out of iteration.
      (this.categories as Category[]).some(category => {
        category.questions.some(question => {
          if (question.isRequired && !question.value) {
            isInvalid = true;
          }

          return isInvalid;
        });
        return isInvalid;
      });
      return isInvalid;
    },
    callNotification(message: string) {
      this.activity++;
      this.message = message;
    },
    async submit() {
      const isInvalid = this.checkInvalidAnswers();

      if (isInvalid) {
        this.hintsActivated = true;
        this.callNotification('requiredQuestionsNotFilledOut');
        return;
      } else {
        this.isDisabled = true;
        const key = this.$store.state.key;
        try {
          const response = await api.post(`/answers?key=${key}`, {
            answers: this.categories,
          });
          const message = response.data.message;
          this.callNotification(message);
        } catch {
          this.isDisabled = false;
          this.callNotification('serviceUnavailable');
        }
      }
    },
  },
  async beforeMount() {
    this[SAVE_KEY](this.$route.params.key);

    await this[LOAD_CATEGORIES]();

    const error = this.$store.state.isError;

    if (error) {
      this.$router.push({ path: '/feedback' });
    } else {
      this.categories = this[GET_CATEGORIES]();
      addTranslationsFromCategories(this.categories);
    }
  },
  data: () => ({
    categories: [] as Category[],
    hintsActivated: false,
    activity: 0,
    message: '',
    isDisabled: false,
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

    .btn-group {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
