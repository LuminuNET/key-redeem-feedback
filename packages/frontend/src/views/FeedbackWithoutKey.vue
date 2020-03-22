<template>
  <div class="feedback view">
    <div class="container">
      <lm-card class="feedback-container">
        <h2 class="title">{{ $t('feedback.feedback') }}</h2>
        <p class="subtitle">{{ $t('feedback.youNeedToEnterYourFeedbackKeyHere') }}</p>
        <p class="description">{{ $t('feedback.ifYouDontKnowHowToGetOneDoTheFollowing') }}</p>
        <p class="description">{{ $t('feedback.logIntoMinecraftAndJoinLuminunet') }}</p>
        <p class="description last">{{ $t('feedback.thenTypeFeedbackToGetYourCode') }}</p>
        <lm-input
          @value-update="(value) => key = value"
          :isSuccess="inputSuccess"
          :isError="inputError"
          :maxlength="6"
          :autofocus="true"
          @keydown.enter.native="submit()"
        />
        <div class="btn-group">
          <lm-button
            @click.native="submit()"
            type="success"
            size="big"
            :text="$t('feedback.submit')"
          />
        </div>
      </lm-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { LmCard, LmButton } from '@luminu/components';
import LmInput from '@/components/luminu/Input.vue';

export default Vue.extend({
  name: 'feedback-without-key',
  data: () => ({
    key: '',
    inputError: false,
    inputSuccess: false,
  }),
  watch: {
    key() {
      if (this.key.length !== 6) {
        this.inputError = true;
        this.inputSuccess = false;
      } else {
        this.inputError = false;
        this.inputSuccess = true;
      }
    },
  },
  components: {
    LmCard,
    LmButton,
    LmInput,
  },
  methods: {
    submit() {
      this.$router.push({ path: `/feedback/${this.key}` });
    },
  },
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

    // Cannot use :last-child here
    .description.last {
      margin-bottom: 10px;
    }

    .btn-group {
      display: flex;
      justify-content: flex-end;

      > * {
        margin-top: 10px;
      }
    }
  }
}
</style>